import { useAuth } from '../../hooks/auth';
import {Container, Brand, Menu, Search, Content, NewNote} from './styles';
import {Header} from '../../components/Header'
import {ButtonText} from '../../components/ButtonText'
import {FiPlus, FiSearch} from 'react-icons/fi'
import {Input} from '../../components/Input'
import {Section} from '../../components/Section'
import { Note } from '../../components/Note';
import { useState, useEffect} from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export function Home(){
    const {user} = useAuth();
    const navigate = useNavigate();
    const [tags, setTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([]);
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);
    
    function handleTagselected(tagName){
        if (tagName === "all") {
            setTagsSelected([])
            return;
        }

        const alreadySelected = tagsSelected.includes(tagName);
        if(alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags)
        }else {
            setTagsSelected(prevState => [...prevState, tagName])
        }        
    }

    function handleDetails(id) {
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags/" + user.id);
            setTags(response.data);
        }
        fetchTags();
    }, [user])

    useEffect(() => {
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
        }
        fetchNotes()
    }, [tagsSelected, search])
    return (
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>
            <Header>

            </Header>
            <Menu>
                <li>
                    <ButtonText 
                        title="Todos"
                        isactive={tagsSelected.length === 0}
                        onClick={() => handleTagselected("all")}
                    />
                </li>
                {tags && tags.map(tag => (
                    <li key={tag.id}>
                        <ButtonText 
                            title={tag.name}
                            onClick={() => handleTagselected(tag.name)}
                            isactive={tagsSelected.includes(tag.name)}
                        />
                    </li>
                ))
                }
            </Menu>
            <Search>
                <Input 
                    placeholder="Pesquisar por título" 
                    icon={FiSearch}
                    onChange={e => setSearch(e.target.value)}
                />
            </Search>
            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note 
                                key={note.id}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    
                    }
                
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus/>
                Criar Nota
            </NewNote>


        </Container>
    )
}