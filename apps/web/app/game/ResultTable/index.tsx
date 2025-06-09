import './ResultTable.scss';

// implement feedback message later
const dummyJson = {
    level: 2,
    spatialAccuracy: 85,
    auditoryAccuracy: 70,
    totalAccuracy: 77.5,
    hits: 15,
    misses: 3,
    falseAlarms: 2
};

export default function ResultTable() {
    // you can destructure objects
    const { level, spatialAccuracy, auditoryAccuracy, totalAccuracy, hits, misses, falseAlarms } = dummyJson;
    return (
        <div className="tableAndTitle">
            <h3 className="title">Result</h3>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Level:(N)</td>
                        <td>{level}</td>
                    </tr>
                    <tr>
                        <td>Spatial Accuracy</td>
                        <td>{spatialAccuracy}</td>
                    </tr>
                    <tr>
                        <td>Auditory Accuracy)</td>
                        <td>{auditoryAccuracy}</td>
                    </tr>
                    <tr>
                        <td>Total Accuracy</td>
                        <td>{totalAccuracy}</td>
                    </tr>
                    <tr>
                        <td>Hits</td>
                        <td>{hits}</td>
                    </tr>
                    <tr>
                        <td>Misses</td>
                        <td>{misses}</td>
                    </tr>
                    <tr>
                        <td>False Alarm</td>
                        <td>{falseAlarms}</td>
                    </tr>      
                </tbody>
            </table>
        </div>
    )
}