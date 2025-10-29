import {useState, useEffect} from 'react';
import api from "../api/axiosInstance.js";

const RepositorySelect = ({selectedProject, onSelectRepository}) => {
    const [repositories, setRepositories] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState("");

    useEffect(()=>{
        if(!selectedProject) return;
        
        // 🚨 수정된 부분: projectNoForApi 변수를 만들어 콜론 이전 부분만 사용
        const projectNoForApi = selectedProject.split(':')[0];
        
        const fetchRepos = async() =>{
            try{
                // 경로: DashBoard.jsx의 성공 경로 구조인 '/portal/pt/'를 따름
                const res = await api.get(`/portal/tool/toolLink/getSrchOption`, {
                    params: {
                        projectNo: projectNoForApi // 정제된 프로젝트 번호 사용
                    }
                });
                
                // 데이터 구조 보강 (res.data.list 또는 res.data)
                const repoList = Array.isArray(res.data) 
                                 ? res.data 
                                 : Array.isArray(res.data?.list) ? res.data.list : [];
                
                console.log("레포지토리 API 응답 전체:", res.data); 
                console.log("추출된 레포지토리 목록:", repoList); 

                if(repoList.length > 0){
                    setRepositories(repoList);
                    
                    const initialRepoName = repoList[0]?.repositoryName || "";
                    setSelectedRepo(initialRepoName);

                    if(initialRepoName){
                        onSelectRepository(initialRepoName);
                    }
                } else {
                    setRepositories([]);
                    setSelectedRepo("");
                    onSelectRepository("");
                }
            } catch(err){
                console.error("레포지토리 목록 불러오기 실패:", err); 
            }
        };
        fetchRepos();
    }, [selectedProject, onSelectRepository]);

    const handleSelect = (e) =>{
        const repoName = e.target.value;
        setSelectedRepo(repoName);
        onSelectRepository(repoName);
    };

    return (
        <div className="repo-selector">
            <label>레포지토리</label>
            <select value={selectedRepo} onChange={handleSelect}>
                {repositories.map((repo) => (
                    <option key={repo.repositoryNo} value={repo.repositoryName}>
                        {repo.repositoryName}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default RepositorySelect;