import {Container, Links, Content} from "./styles";
import {Header} from '../../components/Header';
import {Section} from '../../components/Section';
import {Tag} from '../../components/Tag';
import {Button} from '../../components/Button';
import {ButtonText} from '../../components/ButtonText';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Details() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null)

  function handleBack() {
    navigate(-1)
  }

  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente excluir essa nota?")

    if (confirm) {
      await api.delete(`/notes/${params.id} `)
      handleBack()
    }
  }

  useEffect(()=> {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }
    fetchNote()
  }, [])

  return (
    <Container>
      <Header/>
        {
          data &&
          <main>
            <Content>

              <ButtonText 
                title="Excluir nota"
                onClick={handleRemove}
                />
              <h1>{data.title}</h1>
              <p>
                {data.description}
              </p>
              {
                data.links &&
                <Section title="Links úteis">
                  <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a 
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          >
                          {link.url}
                          </a>
                      </li>
                    ))
                  }
                  </Links>
                </Section>
              }
              {
                data.tags &&
                <Section title="Marcadores">
                  {
                    data.tags.map(tag => (
                      <Tag 
                        key={tag.id}
                        title={tag.name}/>
                    ))
                  }
                  
                  
                </Section>
              }
              <Button 
                title="Voltar"
                onClick={handleBack}
              />


            </Content>
          </main>
        }
        


    </Container>
  )
}