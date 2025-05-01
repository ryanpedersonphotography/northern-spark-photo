import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Navigation = ({ activeCategory, handleNavClick }) => {
    return (_jsxs("div", { className: "flex justify-center mb-4", children: [" ", _jsx("div", { className: "flex", children: _jsx("button", { onClick: () => handleNavClick('senior-grads'), className: `mx-2 px-6 py-2 border-none bg-transparent cursor-pointer text-sm uppercase tracking-wide ${activeCategory === 'senior-grads' ? 'text-gray-800 font-normal' : 'text-gray-500 font-light'}`, children: "Senior Grad Photos" }) })] }));
};
export default Navigation;
