import { Container } from "./styles";

// eslint-disable-next-line react/prop-types
export function Button({title, loading = false, ...rest}) { //na loading foi definido um valor padrão, caso não informado
    return(
    <Container 
        type="button"
        disabled={loading}
        {...rest} //pega todas as propriedades mesmo não estando explícitas, evita precisar digitar todas
        >
        {loading ? title="Carregando" : title}
    </Container>
    )
}