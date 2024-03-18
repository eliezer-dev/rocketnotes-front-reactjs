import { Container, Form } from './styles';
import { Header} from '../../components/Header'
import { Input} from '../../components/Input'
import { Textarea} from '../../components/Textarea'
import { NoteItem} from '../../components/NoteItem'
import { Section} from '../../components/Section'
import { Button} from '../../components/Button'
import { useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ButtonText } from '../../components/ButtonText';


export function New(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setlinks] = useState([]);
    const [newLink, setNewLink] = useState("");
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const navigate = useNavigate();

    function handleAddLink(){
        setlinks(prevState => [...prevState, newLink])
        setNewLink("");
    }

    function handleRemoveLink(deleted){
        setlinks(prevState => prevState.filter(link => link !== deleted))
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag])
        setNewTag("");
    }

    function handleRemoveTags(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    function handleBack() {
        navigate(-1)
      }

    async function handleNewNote(){      

        if (!title) {
            return alert("Digite o título da nota.")
        }

        if (newLink) {
            return alert("Você deixou um link no campo para adicionar, mas não clicou em adicionar.Clique para adicionar ou deixe o campo vazio.")
        }

        if (newTag) {
            return alert("Você deixou uma tag no campo para adicionar, mas não clicou em adicionar.Clique para adicionar ou deixe o campo vazio.")
        }

        await api.post("notes",{
            title,
            description,
            tags,
            links
        })

        alert("Nota criada com sucesso.")
        navigate(-1)
    }

    return(
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText
                            onClick={handleBack} 
                            title="voltar"
                        />
                    </header>
                    <Input 
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}
                        />
                    <Textarea 
                        placeholder="Observações"
                        onChange={e => setDescription(e.target.value)}
                        />
                    <Section title="Links uteis">
                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key = {String(index)}
                                    value={link}
                                    onClick={() => {handleRemoveLink(link)}}
                                />
                                )
                            )                                 
                        }

                        <NoteItem isnew 
                        placeholder="Novo link"
                        value={newLink}
                        onChange={e => setNewLink(e.target.value)}
                        onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                       
                        <div className='tags'>
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key = {String(index)}
                                        value={tag}
                                        onClick={() => {handleRemoveTags(tag)}}
                                    />
                                    )
                            )                                 
                            }

                            <NoteItem 
                                isnew 
                                placeholder="Novo marcador"
                                onChange={e => setNewTag(e.target.value)}                                
                                value={newTag}
                                onClick={handleAddTag}
                                />
                        </div>
                        
                    </Section>

                    <Button 
                        title="Salvar"
                        onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    )
   
}