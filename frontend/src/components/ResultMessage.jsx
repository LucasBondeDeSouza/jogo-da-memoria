import React from "react";

export default ({ attempts }) => {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh]">
                <div className="p-6 flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold text-green-500 mb-4">🎉 Parabéns! 🎉</h2>
                    <p className="mb-2">Você encontrou todas as cartas!</p>
                    <p>Você completou o jogo em <strong>{attempts}</strong> jogadas.</p>
                    <button 
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        onClick={() => window.location.reload()}
                    >
                        Jogar Novamente
                    </button>
                </div>
            </div>
        </div>
    )
}
