import './IssueTab.css'
const IssueTab = () =>{
    return(
        <>
        <div className="issue">
            <div className="bug">
                <h2 className="score">0 점</h2>
                <h3>수정필요 오류</h3>
            </div>
            <div className="seq">
                <h2 className="score">0 점</h2>
                <h3>보안 위험성</h3>
            </div>
            <div className="codeSmell">
                <h2 className="score">0 점</h2>
                <h3>개선 권장</h3>
            </div>
            <div className="coverage">
                <h2 className="score">0 점</h2>
                <h3>코드 검증률</h3>
            </div>
        </div>
        </>
    )
}
export default IssueTab;