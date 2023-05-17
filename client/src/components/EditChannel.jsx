import React, {useState} from "react";
import { useChatContext } from 'stream-chat-react';
import { UserList } from './'
import { CloseCreateChannel } from "../assets/CloseCreateChannel";


const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const { client, setActiveChannel } = useChatContext()
    const [ selectedUsers, setSelectedUsers ] = useState([client.userID || '']) // Created the selected users field and immediatly added ourselfs into that group, because when we create a group chat we would want to be inside that group chat as well

    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value)
    }

    return(
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="Channel-name" />
            <p>Add members</p>
        </div>
    )
}

const EditChannel = ({ setIsEditing }) => {
    const { channel } = useChatContext()
    const [ channelName, setChannelName ] = useState(channel?.data?.name)
    const [ selectedUsers, setSelectedUsers ] = useState([])

    const updateChannel = async (event) => {
        event.preventDefault()

        const nameChanged = channelName != (channel.data.name || channel.data.id) 

        if(nameChanged) {
            await channel.update({ name: channelName }, {text: `Channel name changed to ${channelName}`})
        }

        if(selectedUsers.length){
            await channel.addMembers(selectedUsers)
        }

        setChannelName(null)
        setIsEditing(false)
        setSelectedUsers([])
    }
    
    return(
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing}/>
            </div>

            <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
            <UserList setSelectedUsers={setSelectedUsers}/>
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    )
}

export default EditChannel