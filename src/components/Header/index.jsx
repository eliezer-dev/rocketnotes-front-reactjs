import { Container, Profile, Logout } from "./styles";
import {RiShutDownLine} from 'react-icons/ri'
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { useNavigate } from "react-router-dom";

export function Header () {
    const {signOut, user} = useAuth();
    const navigate = useNavigate();
    function handleSignOut(){
        signOut();
        navigate("/")
    }
    
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    
    return (
        <Container>
            <Profile to="/profile">
                <img 
                    src={avatarUrl}
                    alt={`Foto do ${user.name}`}
                    />
                <div>
                    <span>Bem vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>
           
            <Logout onClick={handleSignOut}>
                <RiShutDownLine/>
            </Logout>
        </Container>


    )
}