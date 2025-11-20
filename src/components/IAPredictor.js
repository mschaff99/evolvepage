import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  CircularProgress, 
  Paper,
  Typography,
  Box
} from '@mui/material';

const IAPredictor = () => {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://evolveasesores.cl/api/predict', {
        text: text
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4,
        bgcolor: 'rgba(139, 92, 246, 0.1)', // neon-purple con opacidad
        color: 'white'
      }}
    >
      <Typography variant="h5" gutterBottom>
        Predictor IA de Conceptos
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ingrese el texto a analizar..."
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(139, 92, 246, 0.5)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(139, 92, 246, 0.8)',
              },
            }
          }}
        />

        <Button
          variant="contained"
          onClick={handlePredict}
          disabled={loading || !text}
          sx={{
            bgcolor: 'rgb(139, 92, 246)',
            color: 'black',
            '&:hover': {
              bgcolor: 'rgb(236, 72, 153)',
            }
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Predecir Concepto'}
        </Button>

        {prediction && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Resultado:</Typography>
            <Paper sx={{ p: 2, mt: 1, bgcolor: 'rgba(17, 24, 39, 0.8)' }}>
              <Typography>{prediction}</Typography>
            </Paper>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default IAPredictor;
