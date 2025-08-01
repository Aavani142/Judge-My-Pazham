import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import MemeReaction from "./components/MemeReaction";
import BananaTypeInfo from "./components/BananaTypeInfo";

export default function App() {
  const [ripenessModel, setRipenessModel] = useState(null);
  const [typeModel, setTypeModel] = useState(null);
  const [image, setImage] = useState(null);
  const [ripenessResult, setRipenessResult] = useState("");
  const [typeResult, setTypeResult] = useState("");
  const imageRef = useRef();

  const ripenessLabels = ["Pacha Pazham", "Pazhampori Pazham", "Kazhiyunna Pazham"];
  const typeLabels = ["Robusta", "Njalipoovan", "Palayamkodan", "Poovan Pazham", "Ethapazham"];

  useEffect(() => {
    const loadModels = async () => {
      const rModel = await tf.loadLayersModel("/ripeness-model/model.json");
      const tModel = await tf.loadLayersModel("/type-model/model.json");
      setRipenessModel(rModel);
      setTypeModel(tModel);
    };
    loadModels();
  }, []);

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const predict = async () => {
    const tensor = tf.browser
      .fromPixels(imageRef.current)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();

    const ripenessPrediction = await ripenessModel.predict(tensor).data();
    const ripenessIndex = ripenessPrediction.indexOf(Math.max(...ripenessPrediction));
    setRipenessResult(ripenessLabels[ripenessIndex]);

    const typePrediction = await typeModel.predict(tensor).data();
    const typeIndex = typePrediction.indexOf(Math.max(...typePrediction));
    setTypeResult(typeLabels[typeIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-200 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold text-yellow-800 mb-6 drop-shadow-sm">
        🍌 Judge My Pazham 👨‍⚖️
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 bg-white p-2 rounded shadow-md"
      />

      {image && (
        <img
          ref={imageRef}
          src={image}
          alt="banana"
          width={224}
          className="rounded-lg shadow-lg border-4 border-yellow-500 mb-4"
        />
      )}

      <button
        onClick={predict}
        className="mt-2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-md transition"
      >
        🔍 Judge Pazham
      </button>

      {ripenessResult && (
        <>
          <h2 className="text-2xl mt-6 font-bold text-green-800 animate-bounce">
            {ripenessResult}
          </h2>
          <MemeReaction label={ripenessResult} />
        </>
      )}

      {typeResult && (
        <>
          <h2 className="text-xl mt-6 font-semibold text-purple-800">
            Type: {typeResult}
          </h2>
          <BananaTypeInfo type={typeResult} />
        </>
      )}
    </div>
  );
}

