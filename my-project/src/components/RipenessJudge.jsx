import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";

export default function RipenessJudge() {
  const [ripenessModel, setRipenessModel] = useState(null);
  const [image, setImage] = useState(null);
  const [ripenessResult, setRipenessResult] = useState(null);
  const imageRef = useRef();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const ripenessLabels = [
    "Pacha Pazham",
    "Pazhutha Pazham",
    "Chatha Pazham"
  ];

  const funnyVerdicts = {
    "Pacha Pazham": {
      message: "🌱 Pacha Pazham! Ithra nerathe venda! 🤨",
      gradient: "from-lime-500 to-green-600",
      emoji: "😬🍃"
    },
    "Pazhutha Pazham": {
      message: "✨ Pazhutha pazham! Perfect for pazhampori 😋",
      gradient: "from-yellow-400 to-orange-400",
      emoji: "🍌"
    },
    "Chatha Pazham": {
      message: "☠️ Chatha Pazham... Nammakku ithu venda! 😵",
      gradient: "from-stone-800 to-amber-900",
      emoji: "💀"
    }
  };

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tf.loadLayersModel("/ripeness-model/model.json");
        setRipenessModel(model);
        console.log("✅ Model loaded");
      } catch (err) {
        console.error("❌ Error loading model:", err);
      }
    };
    loadModel();
  }, []);

  const handleImageUpload = (e) => {
    setRipenessResult(null);
    setIsImageLoaded(false);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const predict = async () => {
    if (!ripenessModel || !imageRef.current) return;

    const tensor = tf.browser
      .fromPixels(imageRef.current)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(tf.scalar(255))
      .expandDims();

    const prediction = await ripenessModel.predict(tensor).data();
    const index = prediction.indexOf(Math.max(...prediction));
    const label = ripenessLabels[index];
    const verdict = funnyVerdicts[label];

    setRipenessResult({
      label,
      ...verdict
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-400 p-6">
      <div className="bg-yellow-100/60 backdrop-blur-md border border-yellow-300 rounded-3xl shadow-2xl p-10 max-w-4xl w-full flex flex-col items-center justify-center text-center">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-800 mb-4 tracking-tight drop-shadow-sm">
          JUDGE MY PAZHAM 🍌
        </h1>

        <p className="text-yellow-900 text-md mb-6 max-w-xl leading-relaxed">
          Upload a banana photo and let our drama-queen AI decide if it’s still green, pazhampori-perfect,
          or should go straight to compost. 🍌✨
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
            onLoad={() => setIsImageLoaded(true)}
            className="rounded-xl shadow-lg mb-6 border-4 border-yellow-500 hover:scale-105 transition duration-300"
          />
        )}

        <button
          onClick={predict}
          disabled={!ripenessModel || !isImageLoaded}
          className={`px-8 py-3 rounded-xl font-bold shadow-xl transition-all duration-300 ${
            !ripenessModel || !isImageLoaded
              ? "bg-yellow-200 text-white cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600 text-white hover:shadow-2xl"
          }`}
        >
          🔍 Predict Ripeness
        </button>

        {ripenessResult && (
          <div
            className={`mt-10 px-8 py-6 rounded-3xl shadow-xl w-full max-w-md text-white bg-gradient-to-br ${ripenessResult.gradient} transform transition-all duration-500 animate-fade-in`}
          >
            <div className="text-6xl mb-4 animate-bounce">{ripenessResult.emoji}</div>
            <h2 className="text-3xl font-extrabold tracking-wide mb-2 drop-shadow-sm">
              {ripenessResult.label}
            </h2>
            <p className="text-lg font-medium italic drop-shadow-sm">
              {ripenessResult.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


