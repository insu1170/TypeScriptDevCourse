import Title from "../components/common/Title"
import Button from "../components/common/Button"
import InputText from "../components/common/inputText"
export default function Home() {
    return(
        <>
        <Title size="medium" color="background" >Home</Title>
            <div>home body</div>
            <Button size = "large" scheme="primary">버튼테스트</Button>
            <InputText placeholder="여기입력"></InputText>
        </>
    )
}