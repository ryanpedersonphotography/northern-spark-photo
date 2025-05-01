import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const Header = ({ windowWidth }) => {
    return (_jsxs(_Fragment, { children: [_jsx("h1", { style: {
                    fontSize: windowWidth < 640 ? '1.75rem' : windowWidth < 1024 ? '2.5rem' : '3rem',
                    fontWeight: 300,
                    textAlign: 'center',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    transition: 'font-size 0.3s ease'
                }, children: "Northern Spark Photography" }), _jsx("p", { style: {
                    textAlign: 'center',
                    fontWeight: 300,
                    marginBottom: '2.5rem',
                    fontSize: windowWidth < 640 ? '0.75rem' : '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#777',
                    transition: 'font-size 0.3s ease'
                }, children: "Senior Graduation Photography in Nisswa, Minnesota" })] }));
};
export default Header;
