import React, { useEffect, useState } from 'react';
import questService from '../services/questService';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const QuestList = () => {
    const [quests, setQuests] = useState([]);
    useEffect(() => {
        const fetchQuests = async () => {
            try {
                const data = await questService.getQuests();
                setQuests(data);
            } catch (error) {
                console.error("Error in loading quests: ", error);
            }
        };
        fetchQuests();
    }, []);
    return (
        <div>
            <Typography variant='h4' gutterBottom>
                Список квестов
            </Typography>
            <List>
                {quests.map((quest) => (
                    <ListItem key={quest._id}>
                        <ListItemText primary={quest.title} secondary={quest.description} />
                        <Button variant='contained' color='primary' style={{ marginRight: '10px' }}>
                            Редактировать
                        </Button>
                        <Button variant='contained' color='secondary'>
                            Удалить
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default QuestList;