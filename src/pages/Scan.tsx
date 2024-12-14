import React, { useRef, useEffect, useState } from "react";
import BottomNavigation from '../components/BottomNavigation';
import jsQR from "jsqr";

const Scan: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"camera" | "upload">("camera"); // 'camera' or 'upload'
  const [cameraStarted, setCameraStarted] = useState(false);

  // Vérification et démarrage de la caméra
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraStarted(true);
        setError(null);
      }
    } catch (err) {
      if (err instanceof Error) {
        // Gestion plus détaillée des erreurs
        if (err.name === "NotFoundError") {
          setError("Aucune caméra disponible.");
        } else if (err.name === "NotAllowedError") {
          setError("Permission refusée pour accéder à la caméra.");
        } else {
          setError("Impossible d'accéder à la caméra.");
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Fonction de scan de QR code avec requestAnimationFrame
  const scanQRCode = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setScanResult(code.data);
          setError(null);
        } else {
          setError("Aucun QR code détecté.");
        }
      }
    }
  };

  useEffect(() => {
    if (cameraStarted) {
      const scanFrame = () => {
        scanQRCode();
        requestAnimationFrame(scanFrame); // Appel de la fonction de scan à chaque rafraîchissement
      };
      requestAnimationFrame(scanFrame); // Initialiser l'animation frame
    }
  }, [cameraStarted]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(img, 0, 0, img.width, img.height);
            const imageData = context.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              setScanResult(code.data);
              setError(null);
            } else {
              setError("Aucun QR code détecté dans l'image.");
            }
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Scanner un QR Code</h1>
      
      {/* Tab Switch */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => {
            setTab("camera");
            setScanResult(null);
            setError(null);
          }}
          className={`px-4 py-2 rounded ${tab === "camera" ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-700"}`}
        >
          Utiliser la Caméra
        </button>
        <button
          onClick={() => {
            setTab("upload");
            setScanResult(null);
            setError(null);
          }}
          className={`px-4 py-2 rounded ${tab === "upload" ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-700"}`}
        >
          Téléverser une Image
        </button>
      </div>

      {/* Camera Scanner */}
      {tab === "camera" && (
        <div className="w-full max-w-md">
          {!cameraStarted && (
            <button
              onClick={startCamera}
              className="px-4 py-2 mb-4 bg-purple-500 text-white rounded"
            >
              Activer la Caméra
            </button>
          )}
          <video ref={videoRef} className="w-full rounded-lg border border-gray-300" playsInline />
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {/* Image Upload */}
      {tab === "upload" && (
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border border-gray-300 rounded p-2 mb-4"
          />
        </div>
      )}

      {/* Results */}
      {scanResult && (
        <div className="mt-6 p-4 bg-green-100 border border-green-500 rounded">
          <h3 className="font-bold text-green-600">Résultat :</h3>
          <p>{scanResult}</p>
        </div>
      )}

      {/* Error Messages */}
      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-500 rounded">
          <h3 className="font-bold text-red-600">Erreur :</h3>
          <p>{error}</p>
        </div>
      )}
      <BottomNavigation />
    </div>
  );
};

export default Scan;
