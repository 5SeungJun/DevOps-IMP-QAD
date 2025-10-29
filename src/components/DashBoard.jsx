import React, { useState, useMemo, useCallback } from "react";
import Header from "./Header";
import ChartComponent from "./ChartComponent";
import IssueTab from "./IssueTab";
import RepositorySelect from "./RepositorySelect"
import {
  projectKeys,
  chartKeyMap,
  chartColors,
} from "../data/constants";
import "../styles/Dashboard.css";
import api from "../api/axiosInstance.js";
import { useEffect } from "react";

const DashBoard = () => {
  const [selectedProject, setSelectedProject] = useState(projectKeys[0]); //선택된 프로젝트 
  const [dropdownValue, setDropdownValue] = useState(projectKeys[0]); // 프로젝트 목록 (임시 선택 값)

  const [meData, setMeData] = useState(null);
  const [projectsData, setProjectsData] = useState([]);

  const [selectedRepo, setSelectedRepo] = useState(""); // 확정된 레포지토리 (API 호출 기준)
  const [dropdownRepoValue, setDropdownRepoValue] = useState(""); 
  
  const [chartData, setChartData] = useState([]); //선택된 레포지토리의 분석 데이터
  
  // 🚨 차트 데이터 로딩 useEffect (POST 요청 및 클라이언트 필터링)
  useEffect(()=>{
    if(!selectedProject || !selectedRepo) return; //프로젝트, 레포지토리가 선택되지 않았으면 return
    
    // selectedProject에서 콜론 앞부분만 추출 (예: "demo:1" -> "demo")
    const projectNoForApi = selectedProject.split(':')[0];
    
    const fetchRepoAnalysis = async()=>{
      try{
        // POST 요청을 사용하되, 파라미터를 JSON 객체로 본문에 전달
        const res = await api.post(`/qms/testmgr/sqhist/getSourceQualityHist`, {
            project_no: projectNoForApi, // project_no 사용
            repository_name: selectedRepo, // underscore(_) 사용
        });
        
        // 데이터 형식에 맞게 변환 및 정렬
        const rawList = Array.isArray(res.data?.list) ? res.data.list : [];
        
        // 클라이언트 측 필터링: 선택된 레포지토리의 데이터만 필터링
        const filteredList = rawList.filter(item => item.repository_name === selectedRepo);
        
        const data = filteredList
          // 데이터 매핑: 차트 컴포넌트의 기존 키에 맞춥니다.
          .map((item) =>({
            // X축 레이블은 날짜입니다.
            name: item.cal_date, 
            // 키 매핑: API의 _ct 필드를 기존 한글 키에 연결
            '보안 취약점': item.vulnerabilities_ct, 
            '보안 경고': item.sec_hot_ct, 
            '오류': item.bugs_ct, 
            '개선 권장': item.code_smells_ct, 
            '복잡도': item.complexity,
          }))
          // 시계열 차트를 위해 날짜 기준으로 오름차순 정렬
          .sort((a, b) => new Date(a.name) - new Date(b.name));

        setChartData(data || []); //차트 데이터 설정
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

        const projectsResponse = await api.get(
          `/portal/pt/myprojects?${params}` 
        );
        console.log("프로젝트 전체 응답:", projectsResponse.data);
        
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

  // currentData 로직: chartData의 최신 데이터를 요약 정보로 사용
  const currentData = useMemo(() => {
    const lastDataPoint = chartData[chartData.length - 1] || {};
    
    return {
      chartData: chartData,
      summary: {
        // IssueTab의 영문 키(vulner, bug 등)에 맞게 한글 값을 매핑
        vulner: lastDataPoint['보안 취약점'] || 0,
        security: lastDataPoint['보안 경고'] || 0,
        bug: lastDataPoint['오류'] || 0,
        smell: lastDataPoint['개선 권장'] || 0,
        complexity: lastDataPoint['복잡도'] || 0,
        total: (lastDataPoint['보안 취약점'] || 0) + (lastDataPoint['보안 경고'] || 0) + (lastDataPoint['오류'] || 0) + (lastDataPoint['개선 권장'] || 0),
      },
    };
  }, [chartData]); // chartData가 변경될 때마다 재계산

  const handleSelectProject = useCallback(() => {
    console.log("적용 버튼 토글");
    setSelectedProject(dropdownValue);
    // 🚨 핵심 수정: 프로젝트 변경 시 chartData를 빈 배열로 초기화
    setChartData([]); 
    setSelectedRepo(""); //레포지토리 목록 초기화
    setDropdownRepoValue(""); // 레포지토리 임시값 초기화
    setLineVisibility(initialLineVisibility);
  }, [dropdownValue, initialLineVisibility]);

  // 레포지토리 적용 버튼 클릭 시 확정 상태 업데이트
  const handleSelectRepo = useCallback(() => {
    if (selectedRepo !== dropdownRepoValue) {
      setSelectedRepo(dropdownRepoValue);
      setLineVisibility(initialLineVisibility);
    }
  }, [dropdownRepoValue, selectedRepo, initialLineVisibility]);

  const toggleLine = useCallback((key) => {
    setLineVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // onSelectRepository를 useCallback으로 메모이제이션
  const memoizedSetSelectedRepo = useCallback((repoName) => {
    setSelectedRepo(repoName);
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
        selectedRepo={selectedRepo}
        // 임시 드롭다운 상태와 핸들러 전달
        dropdownRepoValue={dropdownRepoValue}
        setDropdownRepoValue={setDropdownRepoValue}
        handleSelectRepo={handleSelectRepo} 
        // memoizedSetSelectedRepo 전달
        onSelectRepository={memoizedSetSelectedRepo} 
      />
      <main className="dashboard-main">
        <ChartComponent
          chartData={currentData.chartData}
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