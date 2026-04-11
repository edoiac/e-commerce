
const Logo = () => {
    return (
        <div>
            <svg width="320" height="80" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00B4DB" />
                        <stop offset="100%" stopColor="#00E676" />
                    </linearGradient>
                </defs>

                <g transform="translate(0,10)">
                    <rect x="0" y="0" width="60" height="60" rx="12" fill="#0A2540" />
                    <path d="M35 10 L22 34 H32 L25 50 L45 26 H34 Z"
                        fill="url(#grad)" />
                    <circle cx="18" cy="18" r="2" fill="#00E676" />
                    <circle cx="42" cy="42" r="2" fill="#00E676" />
                </g>

                <text x="85" y="45"
                    fontFamily="Arial, Helvetica, sans-serif"
                    fontSize="28"
                    fontWeight="700"
                    fill="#0A2540">
                    Electro Nuovo
                </text>
            </svg>

        </div>
    )
}

export default Logo