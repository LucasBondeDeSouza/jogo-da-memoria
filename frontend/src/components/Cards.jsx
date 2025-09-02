import React, { useState, useEffect } from "react";
import 'devicon/devicon.min.css';
import CardContent from "../CardContent.json";

export default ({ attempts, setAttempts, setHasWon }) => {
    const [flippedCards, setFlippedCards] = useState({});
    const [shuffledCards, setShuffledCards] = useState([]);
    const [selectCards, setSelectCards] = useState([]);

    // Função para embaralhar cartas
    const shuffleArray = (array) => {
        const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Embaralha as cartas ao montar o componente
    useEffect(() => {
        setShuffledCards(shuffleArray(CardContent));
    }, []);

    // Função para virar a carta
    const handleFlip = (index) => {
        if (selectCards.length === 2 || flippedCards[index]) return;

        const card = shuffledCards[index];

        setFlippedCards((prev) => ({
            ...prev,
            [index]: true,
        }));

        setSelectCards((prev) => [...prev, { index, value: card.value }]);
    };

    // Verifica se duas cartas selecionadas formam um par
    const verifyCards = () => {
        if (selectCards.length === 2) {
            setAttempts(attempts + 1);
            const [first, second] = selectCards;

            if (first.value !== second.value) {
                setTimeout(() => {
                    setFlippedCards((prev) => ({
                        ...prev,
                        [first.index]: false,
                        [second.index]: false,
                    }));
                    setSelectCards([]);
                }, 1000);
            } else {
                setSelectCards([]);
            }
        }
    };

    // Dispara a verificação quando selectCards muda
    useEffect(() => {
        verifyCards();
    }, [selectCards]);

    // Verifica vitória sempre que flippedCards muda
    useEffect(() => {
        if (shuffledCards.length > 0) {
            const allFlipped = Object.values(flippedCards).filter(Boolean).length === shuffledCards.length;
            if (allFlipped) {
                const timeout = setTimeout(() => {
                    setHasWon(true);
                }, 1000); // 1 segundo
                return () => clearTimeout(timeout); // limpa se algo mudar antes
            }
        }
    }, [flippedCards, shuffledCards, setHasWon]);

    return (
        <div className="flex justify-center items-center flex-wrap gap-2">
            {shuffledCards.map((content, index) => (
                <div key={index} className="h-45 w-35 [perspective:1000px] cursor-pointer">
                    <div
                        className={`shadow-xl rounded-xl border border-gray-50 relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                              flippedCards[index] ? "[transform:rotateY(-180deg)]" : ""
                        }`}
                    >
                        {/* Verso */}
                        <div
                            onClick={() => handleFlip(index)} 
                            className="m-2 rounded-xl absolute inset-0 [backface-visibility:hidden] bg-[#004f8c] flex items-center justify-center" 
                            style={{ backgroundImage: "url(https://www.transparenttextures.com/patterns/black-thread-light.png)", }} 
                        >
                        </div>

                        {/* Frente */}
                        <div className="m-3 rounded-xl border border-gray-50 absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center">
                            <i className={content.figure}></i>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};