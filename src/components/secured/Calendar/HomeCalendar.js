import { Container } from '@mui/material';
import Calendar from './AdminCalendar.js';

export default function HomeCalendar() {
    
    return (
        <Container sx={{ mt:5, mb:5 }}>
            <Calendar/>
        </Container>
    );
}