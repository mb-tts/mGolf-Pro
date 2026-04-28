import { useState, useCallback } from "react";
import { Player, SelectedPlayers, SelectionStep } from "./";

interface UseSelectPlayerReturn {
  step: SelectionStep;
  selected: SelectedPlayers;
  modalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleSelectPlayer: (player: Player) => void;
  handleBack: () => void;
  handleNext: () => void;
  handleStart: (selected: SelectedPlayers) => void;
  resetSelection: () => void;
}

export const useSelectPlayer = (): UseSelectPlayerReturn => {
  const [step, setStep] = useState<SelectionStep>(1);
  const [selected, setSelected] = useState<SelectedPlayers>({
    player1: null,
    player2: null,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    resetSelection();
  }, []);

  const resetSelection = useCallback(() => {
    setStep(1);
    setSelected({ player1: null, player2: null });
  }, []);

  const handleSelectPlayer = useCallback(
    (player: Player) => {
      if (step === 1) {
        setSelected((prev) => ({
          ...prev,
          player1: prev.player1?.id === player.id ? null : player,
        }));
      } else {
        if (selected.player1?.id === player.id) return;
        setSelected((prev) => ({
          ...prev,
          player2: prev.player2?.id === player.id ? null : player,
        }));
      }
    },
    [step, selected.player1]
  );

  const handleBack = useCallback(() => {
    if (step === 2) {
      setStep(1);
      setSelected((prev) => ({ ...prev, player2: null }));
    }
  }, [step]);

  const handleNext = useCallback(() => {
    if (step === 1 && selected.player1) {
      setStep(2);
    }
  }, [step, selected.player1]);

  const handleStart = useCallback((finalSelected: SelectedPlayers) => {
    // Handle start game logic here
    console.log("Game starting with:", finalSelected);
    setModalVisible(false);
  }, []);

  return {
    step,
    selected,
    modalVisible,
    openModal,
    closeModal,
    handleSelectPlayer,
    handleBack,
    handleNext,
    handleStart,
    resetSelection,
  };
};
