import { FacebookIcon, InstagramIcon } from '../assets/icons';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white text-center py-6 mt-auto">
      <h2 className="text-xl font-semibold">ALMOST HOME CANINE RESCUE YYC</h2>
      <p className="mb-4">(A.H.C.R Society)</p>
      <p>Contact us by email</p>
      <a
        href="mailto:almosthomecaninerescue@gmail.com"
        className="underline text-sm"
      >
        almosthomecaninerescue@gmail.com
      </a>
      <p className="mt-4">PO Box 2737</p>
      <p>Lac La Biche, AB</p>
      <p>T2A 2C0</p>
      <div className="flex justify-center gap-4 mt-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookIcon className="h-6 w-6 text-white hover:text-gray-300" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="h-6 w-6 text-white hover:text-gray-300" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;