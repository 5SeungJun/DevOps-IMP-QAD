
import './Header.css'
const Header = ({project, onChange}) =>{
    
    return(
        <>
        <div>
            <span className="navigator"
            onClick={()=>{
                window.location.reload()
            }}>대시보드</span>
            <span className="latestDate">최근 테스트 : yyyy.mm.dd hh:mm</span>
            <form action="#">
                <label className="title">프로젝트 선택</label><lable></lable>
                <br></br>
                
                <select 
                className="select" 
                name="projects" 
                id="pro"
                value={project.projectName}
                onChange={onChange}
                >
                    <option value="pro1">프로젝트1</option>
                    <option value="pro2">프로젝트2</option>
                    <option value="pro3">프로젝트3</option>
                    <option value="pro4">프로젝트4</option>
                    <option value="pro5">프로젝트5</option>
                </select>
                <input className="submitButton" type="submit" value="선택"/>

            </form>
            
        </div>
        </>
    )
}

export default Header