import React, { useState, useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { FiMail, FiDownload } from 'react-icons/fi';
import { CiCreditCard1, CiText } from 'react-icons/ci';
import { BiWifi, BiLinkAlt, BiMap } from 'react-icons/bi';
import BottomNavigation from '../components/BottomNavigation';

const GeneratePage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [link, setLink] = useState<string>('');
  const [logo, setLogo] = useState<string | null>(null);
  const [dotColor, setDotColor] = useState<string>('#6B46C1');
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
  const [cornerSquareColor, setCornerSquareColor] = useState<string>('#000000');
  const [cornerDotColor, setCornerDotColor] = useState<string>('#FF0000');
  const [qrSize, setQrSize] = useState<number>(300);
  const [dotType, setDotType] = useState<string>('rounded');
  const [cornerSquareType, setCornerSquareType] = useState<string>('square');
  const [cornerType, setCornerType] = useState<string>('extra-rounded');
  const [cornerDotType, setCornerDotType] = useState<string>('dot');
  const [margin, setMargin] = useState<number>(10);
  const [gradient, setGradient] = useState<boolean>(false);
  const [gradientColor1, setGradientColor1] = useState<string>('#6B46C1');
  const [gradientColor2, setGradientColor2] = useState<string>('#FF0000');
  const [gradientRotation, setGradientRotation] = useState<number>(0);

  const qrCodeRef = useRef<HTMLDivElement>(null);

  const qrCode = useRef(
    new QRCodeStyling({
      width: qrSize,
      height: qrSize,
      dotsOptions: { color: dotColor, type: dotType },
      cornersSquareOptions: { color: cornerSquareColor, type: cornerType },
      cornersDotOptions: { color: cornerDotColor, type: cornerDotType },
      backgroundOptions: { color: backgroundColor },
      imageOptions: { crossOrigin: 'anonymous', margin },
    })
  );

  useEffect(() => {
    if (qrCodeRef.current && link) {
      qrCode.current.append(qrCodeRef.current);
      qrCode.current.update({
        data: link,
        dotsOptions: {
          color: gradient
            ? { gradient: { color1: gradientColor1, color2: gradientColor2, rotation: gradientRotation } }
            : dotColor,
          type: dotType,
        },
        cornersSquareOptions: { color: cornerSquareColor, type: cornerSquareType },
        cornersDotOptions: { color: cornerDotColor, type: cornerDotType },
        backgroundOptions: {
          color: backgroundColor,
        },
        image: logo || undefined,
        imageOptions: { margin },
      });
    }
  }, [
    link,
    dotColor,
    backgroundColor,
    dotType,
    cornerSquareType,
    cornerType,
    cornerDotType,
    cornerSquareColor,
    cornerDotColor,
    logo,
    margin,
    gradient,
    gradientColor1,
    gradientColor2,
    gradientRotation,
    qrSize,
  ]);

  const handleTemplateSelect = (template: string) => setSelectedTemplate(template);

  const handleGenerateQR = () => {
    if (!link) {
      alert('Veuillez fournir un lien ou une valeur.');
      return;
    }
    qrCode.current.update({ data: link });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = () => qrCode.current.download({ extension: 'png' });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="text-center p-4">
        <h1 className="text-xl font-bold text-gray-800">Générer votre QR Code</h1>
      </header>

      <div className="flex-1 p-4">
        {!selectedTemplate && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Commencez par sélectionner un type de QR Code ci-dessous.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'WiFi', icon: <BiWifi size={28} /> },
                { label: 'Lien', icon: <BiLinkAlt size={28} /> },
                { label: 'Localisation', icon: <BiMap size={28} /> },
                { label: 'Texte', icon: <CiText size={28} /> },
                { label: 'Carte Bancaire', icon: <CiCreditCard1 size={28} /> },
                { label: 'Email', icon: <FiMail size={28} /> },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  onClick={() => handleTemplateSelect(label)}
                  className="flex flex-col items-center p-4 bg-white shadow rounded-lg hover:shadow-md hover:bg-purple-100 transition transform hover:-translate-y-1"
                >
                  <div className="text-purple-600 mb-2">{icon}</div>
                  <span className="text-gray-700">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTemplate && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Configurer votre QR Code</h2>
            <input
              type="text"
              placeholder={`Saisir ${selectedTemplate}`}
              className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-600"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">Couleur des points</label>
                <input
                  type="color"
                  value={dotColor}
                  onChange={(e) => setDotColor(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Couleur de fond</label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
            </div>
            

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">Couleur des coins carrés</label>
                <input
                  type="color"
                  value={cornerSquareColor}
                  onChange={(e) => setCornerSquareColor(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Couleur des coins internes</label>
                <input
                  type="color"
                  value={cornerDotColor}
                  onChange={(e) => setCornerDotColor(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">Type de points</label>
                <select
                  value={dotType}
                  onChange={(e) => setDotType(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="square">Square</option>
                  <option value="dots">Dots</option>
                  <option value="rounded">Rounded</option>
                  <option value="classy">Classy</option>
                  <option value="classy-rounded">Classy Rounded</option>
                  <option value="extra-rounded">Extra Rounded</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Type des coins carrés</label>
                <select
                  value={cornerSquareType}
                  onChange={(e) => setCornerSquareType(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="square">Square</option>
                  <option value="dot">Dot</option>
                  <option value="extra-rounded">Extra Rounded</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Type des coins internes</label>
              <select
                value={cornerDotType}
                onChange={(e) => setCornerDotType(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="none">None</option>
                <option value="square">Square</option>
                <option value="dot">Dot</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Taille (px)</label>
              <input
                type="number"
                min="100"
                max="1000"
                value={qrSize}
                onChange={(e) => setQrSize(parseInt(e.target.value, 10))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Activer le dégrader couleur</label>
              <input
                type="checkbox"
                checked={gradient}
                onChange={(e) => setGradient(e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            {gradient && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-1">Couleur 1 du gradient</label>
                  <input
                    type="color"
                    value={gradientColor1}
                    onChange={(e) => setGradientColor1(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Couleur 2 du gradient</label>
                  <input
                    type="color"
                    value={gradientColor2}
                    onChange={(e) => setGradientColor2(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Rotation du gradient</label>
                  <input
                    type="number"
                    min="0"
                    max="360"
                    value={gradientRotation}
                    onChange={(e) => setGradientRotation(parseInt(e.target.value, 10))}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            )}
            <button
              onClick={handleGenerateQR}
              className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Générer
            </button>
            <div className="text-center mt-8">
              <div ref={qrCodeRef} />
            </div>
            <button
              onClick={handleDownload}
              className="w-full py-2 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Télécharger le QR Code
            </button>
            <div className="p-16"></div>
            
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default GeneratePage;