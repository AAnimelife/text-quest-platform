import React from 'react';
import QuestList from '../components/QuestList';

const QuestsPage = () => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const data = await questService.getQuests();
        setQuests(data);
      } catch (error) {
        console.error('Error while loading quest', error);
      }
    };
    fetchQuests();
  }, []);

  const handleQuestCreated = (newQuest) => {
    setQuests([...quests, newQuest]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Управление квестами
      </Typography>
      <QuestForm onQuestCreated={handleQuestCreated} />
      <QuestList quests={quests} />
    </Container>
  );
};

export default QuestsPage;