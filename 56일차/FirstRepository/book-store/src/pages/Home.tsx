import Button from "../components/common/Button";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import InputText from "../components/common/InputText";
import Title from "../components/common/Title";
import { formatNumber } from "../utils/format";

function Home() {
    const COUNT = 10000
    return (
        <>
            <Title size="large" color="background">book</Title>
            <div>count: {formatNumber(COUNT)}</div>
            <Button size="large" schema="primary">버튼 테스트</Button>
            <InputText placeholder="여기에 입력하세요"/>
        </>
    )
}

export default Home;