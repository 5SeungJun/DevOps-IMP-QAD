import {useState} from 'react'
import './App.css'
import Header from "./components/Header.jsx"
import MyChart from "./components/MyChart.jsx"
import IssueTab from "./components/IssueTab.jsx"



function App() {
  const [project, setProject] = useState({
        projectName: "",
        data: {
          labels: ["날짜-1", "날짜-2", "날짜-3", "날짜-4"], //날짜 api 
          datasets: [
            {
              label: "프로젝트 품질 점수",
              data: [12, 19, 3, 5], //점수 
              borderColor: "rgba(75,100,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
            },
          ],
        },
    });

    const onChange = (e) =>{
        setProject({
            ...project,
            [e.target.projectName]: e.target.value,
        })
    }
  return(
    <>
    <Header project={project} onChange={onChange}/>
    <br></br>
    <MyChart project={project}/>
    <IssueTab/>
    </>
  )
}

export default App
