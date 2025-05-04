import React from 'react';

interface FormAjudaProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (value: string) => void;
}

export default function FormAjuda({ isOpen, onClose, onSubmit }: FormAjudaProps) {
    const [inputValue, setInputValue] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-[#000913] rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl text-white font-semibold mb-2">Problemas ao conectar?</h2>
                <p className="text-gray-200 mb-4">Caso receba a mensagem -Player já conectado-, nos envie seu SummonerName#Tag que ele vai ser liberado em um click.</p>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium text-gray-200">
                        SummonerName#Tag
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </label>
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-black px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1 bg-green-600 text-black rounded hover:bg-green-700"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
