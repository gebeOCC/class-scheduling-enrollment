import './preloader.css'

function PreLoader() {
    return (
        <div className="flex justify-center items-center h-full bg-opacity-50 bg-gray-100">
            <div className="scene">
                <div className="cube-wrapper">
                    <div className="cube">
                        <div className="cube-faces">
                            <div className="cube-face shadow"></div>
                            <div className="cube-face bottom"></div>
                            <div className="cube-face top"></div>
                            <div className="cube-face left"></div>
                            <div className="cube-face right"></div>
                            <div className="cube-face back"></div>
                            <div className="cube-face front"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreLoader;