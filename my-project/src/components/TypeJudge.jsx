import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import BananaTypeInfo from "./BananaTypeInfo";

export default function TypeJudge() {
  const [typeModel, setTypeModel] = useState(null);
  const [image, setImage] = useState(null);
  const [typeResult, setTypeResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const imageRef = useRef();

  const typeLabels = [
    "Robusta",
    "Njalipoovan",
    "Palayamkodan",
    "Poovan Pazham",
    "Ethapazham"
  ];

  const typeVerdicts = {
    Robusta: {
      emoji: "💪",
      message: "The OG pazham — strong and thick-skinned. Made for frying or flexing.",
    },
    Njalipoovan: {
      emoji: "🌸",
      message: "Sweet and nostalgic. The pazham that smells like summer holidays.",
    },
    Palayamkodan: {
      emoji: "🍯",
      message: "Soft and sugary — basically a dessert in disguise.",
    },
    "Poovan Pazham": {
      emoji: "👑",
      message: "Elegant and elite. A pazham with royal vibes.",
    },
    Ethapazham: {
      emoji: "🔥",
      message: "Bold and heavy-duty. Best enjoyed steamed or roasted.",
    }
  };

  useEffect(() => {
    const loadModel = async () => {
      try {
        const tModel = await tf.loadLayersModel("/type-model/model.json");
        setTypeModel(tModel);
        console.log("✅ Type model loaded");
      } catch (error) {
        console.error("❌ Error loading type model:", error);
        setError("Failed to load banana type model. Try refreshing.");
      }
    };
    loadModel();
  }, []);

  const handleImageUpload = (e) => {
    setError("");
    setTypeResult(null);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const predict = async () => {
    if (!typeModel || !imageRef.current) {
      setError("Model not loaded or image not selected");
      return;
    }

    setLoading(true);
    try {
      const tensor = tf.browser
        .fromPixels(imageRef.current)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();

      const prediction = await typeModel.predict(tensor).data();
      const index = prediction.indexOf(Math.max(...prediction));
      const result = typeLabels[index];
      setTypeResult(result);
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Something went wrong during prediction.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-400 p-6">
      <div className="bg-yellow-100/70 backdrop-blur-xl border border-yellow-300 rounded-3xl shadow-xl p-10 max-w-4xl w-full flex flex-col items-center justify-center text-center">

        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-900 mb-4 tracking-tight drop-shadow-sm">
          🍌 Judge Pazham Type
        </h1>

        <p className="text-yellow-800 text-md md:text-lg mb-6 max-w-xl leading-relaxed">
          Upload a banana photo and let our ML-powered fruit oracle identify your pazham: Robusta, Njalipoovan, Palayamkodan, or the royal Poovan?
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-6 bg-white border border-yellow-500 p-2 rounded shadow-md text-yellow-800 font-semibold cursor-pointer hover:bg-yellow-100 transition"
        />

        {image && (
          <img
            ref={imageRef}
            src={image}
            alt="banana"
            width={224}
            className="rounded-xl shadow-md mb-6 border-4 border-yellow-500 hover:scale-105 transition duration-300"
          />
        )}

        {loading ? (
          <p className="text-yellow-900 text-lg font-semibold animate-pulse">
            🍌 Thinking... almost ripe for judgment.
          </p>
        ) : (
          <button
            onClick={predict}
            className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg text-white font-bold shadow-md transition"
          >
            🔍 Predict Type
          </button>
        )}

        {error && (
          <p className="text-red-800 bg-white mt-4 px-4 py-2 rounded shadow font-medium">
            {error}
          </p>
        )}

        {typeResult && !error && (
          <>
            <div className="mt-8 px-6 py-5 rounded-xl shadow-xl text-yellow-900 text-center w-full max-w-md bg-yellow-300 border border-yellow-500 transition-all duration-500">
              <div className="text-4xl mb-2">{typeVerdicts[typeResult].emoji}</div>
              <h2 className="text-3xl font-bold mb-1">{typeResult}</h2>
              <p className="text-md italic font-medium">{typeVerdicts[typeResult].message}</p>
            </div>
            <BananaTypeInfo type={typeResult} />
          </>
        )}
      </div>
    </div>
  );
}

