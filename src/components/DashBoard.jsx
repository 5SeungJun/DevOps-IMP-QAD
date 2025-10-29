import React, { useState, useMemo, useCallback } from "react";
import Header from "./Header";
import ChartComponent from "./ChartComponent";
import IssueTab from "./IssueTab";
import RepositorySelect from "./RepositorySelect"
import {
  projectData,
  projectKeys,
  chartKeyMap,
  chartColors,
} from "../data/constants";
import "../styles/Dashboard.css";
import api from "../api/axiosInstance.js";
import { useEffect } from "react";

const DashBoard = () => {
  const [selectedProject, setSelectedProject] = useState(projectKeys[0]); //선택된 프로젝트 
  const [dropdownValue, setDropdownValue] = useState(projectKeys[0]); // 프로젝트 목록

  const [meData, setMeData] = useState(null);
  const [projectsData, setProjectsData] = useState([]);

  const [selectedRepo, setSelectedRepo] = useState(""); //선택된 레포지토리
  const [chartData, setChartData] = useState([]); //선택된 레포지토리의 분석 데이터
  
  useEffect(()=>{
    if(!selectedProject || !selectedRepo) return; //프로젝트, 레포지토리가 선택되지 않았으면 return
    const fetchRepoAnalysis = async()=>{
      try{
        // 레포지토리 분석 API는 project_no를 사용하는 것으로 추정하여 유지
        const res = await api.get(`/portal/pt/getSourceQualityCi`, {params : {project_no: selectedProject, repository_name: selectedRepo},});
        //데이터 형식에 맞게 변환.
        const data = res.data?.list?.map((item) =>({
          name: item.source_code,
          보안취약점: item.vulner,
          보안경고: item.security,
          오류: item.bug,
          개선권장: item.smell,
          복잡도: item.complexity,
        }));
        setChartData(data || []); //차트 데이터 가져오기
      }catch(err){
        console.error("분석 결과 불러오기 실패:", err);
      }
    };
    fetchRepoAnalysis();
  }, [selectedProject, selectedRepo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // /portal/me 호출
        const meResponse = await api.get("/portal/me");
        setMeData(meResponse.data);

        // /portal/pt/myprojects 호출 (경로 수정 완료)
        const params = new URLSearchParams({
          systemRole: "SVCMGR",
          serviceRole: "",
          group_code: "SVCMGR",
          user_id: "demo_admin",
          sp_uid: "20250527220054578551",
        });

        // 프로젝트 목록 API 경로 수정 (1차 해결)
        const projectsResponse = await api.get(
          `/portal/pt/myprojects?${params}` 
        );
        console.log("프로젝트 전체 응답:", projectsResponse.data);
        
        // 응답 데이터 구조 보강 (res.data.list 또는 res.data)
        const projects = Array.isArray(projectsResponse.data?.list) 
                          ? projectsResponse.data.list 
                          : Array.isArray(projectsResponse.data) ? projectsResponse.data : [];

        setProjectsData(projects);
        
        if(projects.length > 0){
          const firstProjectNo = projects[0].project_no;
          setSelectedProject(firstProjectNo);
          setDropdownValue(firstProjectNo);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchData();
  }, []);

  const initialLineVisibility = useMemo(() => {
    return Object.values(chartKeyMap).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
  }, []);

  const [lineVisibility, setLineVisibility] = useState(initialLineVisibility);

  const currentData = useMemo(() => {
    const data = projectData[selectedProject];

    // 데이터가 없으면 기본값 반환
    if (!data) {
      return {
        chartData: [],
        summary: {
          vulner: 0,
          security: 0,
          bug: 0,
          smell: 0,
          complexity: 0,
          total: 0,
        },
      };
    }

    return data;
  }, [selectedProject]);

  const handleSelectProject = useCallback(() => {
    console.log("적용 버튼 토글");
    setSelectedProject(dropdownValue);
    setSelectedRepo(""); //프로젝트 변경 시, 레포지토리 목록 초기화
    setLineVisibility(initialLineVisibility);
  }, [dropdownValue, initialLineVisibility]);

  const toggleLine = useCallback((key) => {
    setLineVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);
  
  return (
    <div className="dashboard-container">
      <Header
        dropdownValue={dropdownValue}
        setDropdownValue={setDropdownValue}
        handleSelectProject={handleSelectProject}
        testDate={meData?.lastResponseDate}
        projectKeys={projectKeys}
        projectsData={projectsData}
      />
      <RepositorySelect
        selectedProject={selectedProject}
        onSelectRepository={(repoName=>setSelectedRepo(repoName))}
      />
      <main className="dashboard-main">
        <ChartComponent
          chartData={chartData}
          lineVisibility={lineVisibility}
          chartKeyMap={chartKeyMap}
          chartColors={chartColors}
        />
        <IssueTab
          summaryData={currentData.summary}
          lineVisibility={lineVisibility}
          toggleLine={toggleLine}
          chartKeyMap={chartKeyMap}
        />
      </main>
    </div>
  );
};

export default DashBoard;