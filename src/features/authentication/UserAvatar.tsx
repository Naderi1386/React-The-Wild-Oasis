import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

interface UserMetaDataType{
fullName:string
avatar:string
}

const UserAvatar = () => {
  const {user}=useUser()
  const {fullName,avatar}=user?.user_metadata as UserMetaDataType
  const avatarURL=avatar ? avatar : './public/default-user.jpg' 
  
  return (
    <StyledUserAvatar>
      <Avatar src={avatarURL} alt={`Avatar of ${fullName}`}/>
      <span>{fullName}</span>
    </StyledUserAvatar>
  )
}

export default UserAvatar