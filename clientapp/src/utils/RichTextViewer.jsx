import { useState, useRef, useEffect } from "react"

const RichTextViewer = ({ content, limit = false, maxHeight = 400 }) => {
    const [expanded, setExpanded] = useState(false)
    const [showToggle, setShowToggle] = useState(false)
    const contentRef = useRef(null)

    useEffect(() => {
        if (limit && contentRef.current && contentRef.current.scrollHeight > maxHeight) {
            setShowToggle(true)
        } else {
            setShowToggle(false)
        }
    }, [content, limit, maxHeight])

    const fadeStyle = {
        WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
    }

    return (
        <div className="relative">
            <div
                ref={contentRef}
                className={`overflow-hidden transition-all duration-300 ease-in-out max-w-none text-black text-lg leading-relaxed`}
                style={{
                    maxHeight: limit && !expanded ? `${maxHeight}px` : "none",
                    ...(limit && !expanded ? fadeStyle : {}),
                }}
                dangerouslySetInnerHTML={{ __html: content }}
            />


            {limit && showToggle && (
                <div className="text-center mt-3">
                    <button
                        className="text-blue-500 hover:text-blue-700 text-sm border border-blue-500 px-3 py-1 rounded transition-all"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "Ẩn bớt" : "Xem thêm"}
                    </button>
                </div>
            )}
        </div>
    )
}

export default RichTextViewer
