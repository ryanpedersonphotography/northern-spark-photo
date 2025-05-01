import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const HamburgerMenu = ({ menuOpen, toggleMenu, activeCategory, handleNavClick, windowWidth }) => {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "absolute top-8 right-8 z-20", children: _jsxs("button", { onClick: toggleMenu, className: "flex flex-col justify-center items-center w-12 h-12 bg-white rounded-full shadow-sm hover:shadow transition-all duration-300 border-none cursor-pointer p-2", "aria-label": "Menu", children: [_jsx("span", { className: `block w-5 h-0.5 bg-gray-800 transition-all duration-300 ease-out ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}` }), _jsx("span", { className: `block w-5 h-0.5 bg-gray-800 my-1 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}` }), _jsx("span", { className: `block w-5 h-0.5 bg-gray-800 transition-all duration-300 ease-out ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}` })] }) }), _jsx("div", { className: `fixed top-0 right-0 h-screen bg-white shadow-lg z-10 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`, style: {
                    width: windowWidth < 640 ? '240px' : windowWidth < 1024 ? '300px' : '360px'
                }, children: _jsxs("div", { style: {
                        padding: windowWidth < 640 ? '28px 16px' : windowWidth < 1024 ? '32px 24px' : '40px 32px',
                        paddingTop: windowWidth < 640 ? '100px' : windowWidth < 1024 ? '120px' : '140px'
                    }, children: [_jsxs("div", { style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: windowWidth < 640 ? '30px' : windowWidth < 1024 ? '36px' : '48px'
                            }, children: [_jsx("button", { onClick: () => {
                                        handleNavClick('photos');
                                        toggleMenu();
                                    }, style: {
                                        textAlign: 'left',
                                        padding: windowWidth < 640 ? '12px 16px' : windowWidth < 1024 ? '16px 24px' : '20px 32px',
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        fontSize: windowWidth < 640 ? '12px' : windowWidth < 1024 ? '14px' : '16px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        fontWeight: activeCategory === 'photos' ? 400 : 300,
                                        color: activeCategory === 'photos' ? '#333' : '#777',
                                        borderLeft: activeCategory === 'photos' ? '2px solid #333' : 'none',
                                        paddingLeft: activeCategory === 'photos' ? (windowWidth < 640 ? '14px' : windowWidth < 1024 ? '22px' : '30px') : undefined,
                                        transition: 'all 0.2s ease'
                                    }, onMouseOver: (e) => {
                                        e.currentTarget.style.backgroundColor = '#f9f9f9';
                                    }, onMouseOut: (e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }, children: "Gallery" }), _jsx("button", { onClick: () => {
                                        handleNavClick('about');
                                        toggleMenu();
                                    }, style: {
                                        textAlign: 'left',
                                        padding: windowWidth < 640 ? '12px 16px' : windowWidth < 1024 ? '16px 24px' : '20px 32px',
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        fontSize: windowWidth < 640 ? '12px' : windowWidth < 1024 ? '14px' : '16px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        fontWeight: activeCategory === 'about' ? 400 : 300,
                                        color: activeCategory === 'about' ? '#333' : '#777',
                                        borderLeft: activeCategory === 'about' ? '2px solid #333' : 'none',
                                        paddingLeft: activeCategory === 'about' ? (windowWidth < 640 ? '14px' : windowWidth < 1024 ? '22px' : '30px') : undefined,
                                        transition: 'all 0.2s ease'
                                    }, onMouseOver: (e) => {
                                        e.currentTarget.style.backgroundColor = '#f9f9f9';
                                    }, onMouseOut: (e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }, children: "About" }), _jsx("button", { onClick: () => {
                                        handleNavClick('pricing');
                                        toggleMenu();
                                    }, style: {
                                        textAlign: 'left',
                                        padding: windowWidth < 640 ? '12px 16px' : windowWidth < 1024 ? '16px 24px' : '20px 32px',
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        fontSize: windowWidth < 640 ? '12px' : windowWidth < 1024 ? '14px' : '16px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        fontWeight: activeCategory === 'pricing' ? 400 : 300,
                                        color: activeCategory === 'pricing' ? '#333' : '#777',
                                        borderLeft: activeCategory === 'pricing' ? '2px solid #333' : 'none',
                                        paddingLeft: activeCategory === 'pricing' ? (windowWidth < 640 ? '14px' : windowWidth < 1024 ? '22px' : '30px') : undefined,
                                        transition: 'all 0.2s ease'
                                    }, onMouseOver: (e) => {
                                        e.currentTarget.style.backgroundColor = '#f9f9f9';
                                    }, onMouseOut: (e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }, children: "Pricing" }), _jsx("button", { onClick: () => {
                                        handleNavClick('contact');
                                        toggleMenu();
                                    }, style: {
                                        textAlign: 'left',
                                        padding: windowWidth < 640 ? '12px 16px' : windowWidth < 1024 ? '16px 24px' : '20px 32px',
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        fontSize: windowWidth < 640 ? '12px' : windowWidth < 1024 ? '14px' : '16px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        fontWeight: activeCategory === 'contact' ? 400 : 300,
                                        color: activeCategory === 'contact' ? '#333' : '#777',
                                        borderLeft: activeCategory === 'contact' ? '2px solid #333' : 'none',
                                        paddingLeft: activeCategory === 'contact' ? (windowWidth < 640 ? '14px' : windowWidth < 1024 ? '22px' : '30px') : undefined,
                                        transition: 'all 0.2s ease'
                                    }, onMouseOver: (e) => {
                                        e.currentTarget.style.backgroundColor = '#f9f9f9';
                                    }, onMouseOut: (e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }, children: "Contact" })] }), _jsxs("div", { style: {
                                position: 'absolute',
                                bottom: windowWidth < 640 ? '40px' : windowWidth < 1024 ? '60px' : '80px',
                                left: 0,
                                right: 0,
                                padding: windowWidth < 640 ? '0 16px' : windowWidth < 1024 ? '0 24px' : '0 32px',
                            }, children: [_jsx("p", { style: {
                                        color: '#aaa',
                                        fontSize: windowWidth < 640 ? '10px' : windowWidth < 1024 ? '11px' : '12px',
                                        fontWeight: 300,
                                        marginBottom: windowWidth < 640 ? '24px' : windowWidth < 1024 ? '28px' : '32px'
                                    }, children: "Senior Graduation Photography in Nisswa, MN" }), _jsxs("div", { style: {
                                        display: 'flex',
                                        gap: windowWidth < 640 ? '16px' : windowWidth < 1024 ? '20px' : '24px'
                                    }, children: [_jsx("a", { href: "#", style: {
                                                color: '#aaa',
                                                textDecoration: 'none',
                                                transition: 'color 0.2s ease'
                                            }, onMouseOver: (e) => {
                                                e.currentTarget.style.color = '#333';
                                            }, onMouseOut: (e) => {
                                                e.currentTarget.style.color = '#aaa';
                                            }, children: _jsx("span", { style: {
                                                    fontSize: windowWidth < 640 ? '10px' : windowWidth < 1024 ? '11px' : '12px',
                                                    fontWeight: 300,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.1em'
                                                }, children: "Instagram" }) }), _jsx("a", { href: "#", style: {
                                                color: '#aaa',
                                                textDecoration: 'none',
                                                transition: 'color 0.2s ease'
                                            }, onMouseOver: (e) => {
                                                e.currentTarget.style.color = '#333';
                                            }, onMouseOut: (e) => {
                                                e.currentTarget.style.color = '#aaa';
                                            }, children: _jsx("span", { style: {
                                                    fontSize: windowWidth < 640 ? '10px' : windowWidth < 1024 ? '11px' : '12px',
                                                    fontWeight: 300,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.1em'
                                                }, children: "Facebook" }) })] })] })] }) })] }));
};
export default HamburgerMenu;
