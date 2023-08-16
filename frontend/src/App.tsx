import { useEffect, useState } from 'react';
import { PasswordCardComponent } from 'PasswordCard';
import { NewPasswordCard } from 'NewPasswordCard';
import './App.css'

import useGetPasswordCards from 'hooks/useGetPasswordCards';
import { Button, Modal, Box, TextField } from '@mui/material';
import { PasswordCard } from 'api/passwordCard/passwordCard.model';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black'
};

interface IEditData {
  edit: boolean,
  card: undefined | PasswordCard,
}

function App() {
  const { getCards, passwordCards, loading, error } = useGetPasswordCards();
  const [filteredList, setFilteredList] = useState(passwordCards);
  const [editData,setEditData] = useState<IEditData>({
    edit: false,
    card: undefined,
  })

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setEditData({
      edit: false,
      card: undefined,
    })
    getCards();
  }

  const setEdit = (card: PasswordCard) => {
    setEditData({
      edit: true,
      card: card,
    })
    setOpen(true)
  }


  const filterBySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    var updatedList = [...passwordCards];
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(updatedList);
  };

  useEffect(() => {
    getCards();
    setFilteredList(passwordCards);
  },[]);

  return (
    <>
      <div>
        <h1>Password Manager</h1>
        { loading && <p>Loading...</p> }
        { error && <p>Error: {error}</p> }
        <div>
          <Button onClick={handleOpen}>Add PasswordCard</Button>
          <TextField name="search" label="Search" type = "search"  variant="outlined" onChange={filterBySearch} />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
              <NewPasswordCard 
                closeModal={handleClose}
                edit={editData.edit}
                passwordCard={editData.card}
              />
            </Box>
          </Modal>

          { !loading && !error && filteredList.map((card) => {
            return <PasswordCardComponent passwordCard={card} setEdit={setEdit}/>
            })}
        </div>
      </div>
    </>
  )
}

export default App
