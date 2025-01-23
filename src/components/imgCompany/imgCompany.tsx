import "./imgCompany.css"

interface LogoItem {
    name: string;
    imageUrl: string;
}

interface LogoListProps {
    logos: LogoItem[];
}

const LogoList: React.FC<LogoListProps> = ({ logos }) => {
    return (
        <div className="logo-list">
            {logos.map((logo, index) => (
                <div key={index} className="logo-item">
                    <img src={logo.imageUrl} alt={logo.name} className="logo-image" />
                </div>
            ))}
        </div>
    );
};
export default LogoList;