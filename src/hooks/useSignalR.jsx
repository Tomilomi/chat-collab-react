import { useContext } from 'react';
import { SignalRContext } from '../context/SignalRContext';

export const useSignalR = () => useContext(SignalRContext);