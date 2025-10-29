import {useState, useEffect} from 'react';
import api from "../api/axiosInstance.js";

const RepositorySelect = ({selectedProject, onSelectRepository}) => {
    const [repositories, setRepositories] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState("");

    useEffect(()=>{
        if(!selectedProject) return;
        
        const fetchRepos = async() =>{
            try{
                const res = await api.get(`/pt/getSrchOption?projectNo=${selectedProject}`);
                
                if(res.data && Array.isArray(res.data)){
                    setRepositories(res.data);
                    const initialRepoName = res.data[0]?.repositoryName || "";
                    setSelectedRepo(initialRepoName);

                    if(initialRepoName){
                        onSelectRepository(initialRepoName);
                    }
                }
            } catch(err){
                console.error("레포지토리 목록 불러오기 실패:", err);
            }
        };
        fetchRepos();
    }, [selectedProject]);

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