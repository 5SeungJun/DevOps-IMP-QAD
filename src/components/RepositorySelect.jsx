import {useState, useEffect} from 'react';
import api from "../api/axiosInstance.js";

// selectedRepo를 prop으로 받음
const RepositorySelect = ({selectedProject, onSelectRepository, selectedRepo, dropdownRepoValue, setDropdownRepoValue, handleSelectRepo}) => {
    const [repositories, setRepositories] = useState([]);

    useEffect(()=>{
        if(!selectedProject) return;
        
        const projectNoForApi = selectedProject.split(':')[0];
        
        const fetchRepos = async() =>{
            try{
                // 성공한 최종 경로를 반영합니다.
                const res = await api.get(`/portal/tool/toolLink/getSrchOption`, {
                    params: {
                        projectNo: projectNoForApi // 정제된 프로젝트 번호 사용
                    }
                });
                
                // 데이터 구조 보강 (res.data.list 또는 res.data)
                const repoList = Array.isArray(res.data) 
                                 ? res.data 
                                 : Array.isArray(res.data?.list) ? res.data.list : [];
                
                if(repoList.length > 0){
                    setRepositories(repoList);
                    
                    const initialRepoName = repoList[0]?.repositoryName || "";
                    
                    // 초기 로딩 시: 부모의 확정 상태와 임시 상태를 모두 초기값으로 설정
                    onSelectRepository(initialRepoName); 
                    setDropdownRepoValue(initialRepoName);
                } else {
                    setRepositories([]);
                    onSelectRepository("");
                    setDropdownRepoValue("");
                }
            } catch(err){
                console.error("레포지토리 목록 불러오기 실패:", err); 
            }
        };
        fetchRepos();
        
        // selectedProject가 변경될 때, 임시 드롭다운 값을 초기화
        return () => {
            setDropdownRepoValue("");
        };
        
    }, [selectedProject, onSelectRepository, setDropdownRepoValue]);

    // selectedRepo가 변경될 때마다 dropdownRepoValue를 동기화하여 드롭다운 고정 문제 해결
    useEffect(() => {
        // 부모의 확정 상태(selectedRepo)가 변경되면, 임시값도 그 값으로 즉시 동기화합니다.
        if (selectedRepo !== dropdownRepoValue) {
            setDropdownRepoValue(selectedRepo);
        }
    }, [selectedRepo, setDropdownRepoValue]);


    const handleDropdownChange = (e) =>{
        const repoName = e.target.value;
        // 드롭다운 변경 시: 확정 상태 대신 임시 상태만 업데이트
        setDropdownRepoValue(repoName);
    };

    return (
        <div className="repo-selector">
            <label>레포지토리</label>
            <select 
                value={dropdownRepoValue} // 임시 상태를 드롭다운 값으로 사용
                onChange={handleDropdownChange}
            >
                {repositories.map((repo) => (
                    <option key={repo.repositoryNo} value={repo.repositoryName}>
                        {repo.repositoryName}
                    </option>
                ))}
            </select>
            {/* 적용 버튼 추가 */}
            <button className="apply-btn" onClick={handleSelectRepo} disabled={dropdownRepoValue === selectedRepo}>
                적용
            </button>
        </div>
    )
}
export default RepositorySelect;