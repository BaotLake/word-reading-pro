import React from 'react'

type Config = {
    width: number
    height: number

    borderRadius: number
    arrowHeight: number
    arrowWidth: number
    shadowRadius: number
}

interface Props {
    ratioX: number // 0 ~ 1
    arrowDirection: 'up' | 'down'
    config: Config
}

export default function SvgBorder({ ratioX, arrowDirection, config }: Props) {
    const {
        width,
        height,
        borderRadius,
        arrowHeight,
        arrowWidth,
        shadowRadius,
    } = config

    const arrowRealHeightRatio = 1
    const marginY = shadowRadius
    const marginX = shadowRadius

    let arrowBottomCenterX = () => {
        let x = ratioX * width
        let minX = borderRadius + arrowWidth / 2
        if (x < minX) {
            return minX
        }
        let maxX = width - borderRadius - arrowWidth / 2
        if (x > maxX) {
            return maxX
        }
        return x
    }
    let arrowX1 = arrowBottomCenterX()

    let arrowTopApexX = () => {
        let x = ratioX * width
        x = arrowX1 + (x - arrowX1) * arrowRealHeightRatio
        return x
    }
    let arrowX2 = arrowTopApexX()

    let upPathD = () => {
        let topY = arrowHeight
        let bottomY = height + arrowHeight
        let arrowY2 = arrowHeight * (1 - arrowRealHeightRatio)

        let d = `M${borderRadius},${topY} L${arrowX1 - arrowWidth / 2
            },${topY} L${arrowX2},${arrowY2} L${arrowX1 + arrowWidth / 2
            },${topY} L${width - borderRadius
            },${topY} a${borderRadius} ${borderRadius} 90 0 1 ${borderRadius},${borderRadius} L${width},${topY + borderRadius
            } L${width},${bottomY - borderRadius
            } a${borderRadius} ${borderRadius} 90 0 1 ${-borderRadius},${borderRadius} L${width - borderRadius
            },${bottomY} L${borderRadius},${bottomY} a${borderRadius} ${borderRadius} 90 0 1 ${-borderRadius},${-borderRadius} L${0},${bottomY - borderRadius
            } L${0},${topY + borderRadius
            } a${borderRadius},${borderRadius},90,0,1,${borderRadius},${-borderRadius} Z`

        return d
    }

    let downPathD = () => {
        let topY = arrowHeight
        let bottomY = height + arrowHeight
        let arrowY2 = bottomY + arrowHeight * arrowRealHeightRatio

        let d = `M${borderRadius},${topY} L${width - borderRadius
            },${topY} a${borderRadius} ${borderRadius} 90 0 1 ${borderRadius},${borderRadius} L${width},${topY + borderRadius
            } L${width},${bottomY - borderRadius
            } a${borderRadius} ${borderRadius} 90 0 1 ${-borderRadius},${borderRadius} L${width - borderRadius
            },${bottomY} L${arrowX1 + arrowWidth / 2
            },${bottomY} L${arrowX2},${arrowY2} L${arrowX1 - arrowWidth / 2
            },${bottomY} L${borderRadius},${bottomY} a${borderRadius} ${borderRadius} 90 0 1 ${-borderRadius},${-borderRadius} L${0},${bottomY - borderRadius
            } L${0},${topY + borderRadius
            } a${borderRadius},${borderRadius},90,0,1,${borderRadius},${-borderRadius} Z`

        return d
    }

    let pathD = () => {
        if (arrowDirection === 'down') return downPathD()
        return upPathD()
    }

    return (
        <svg
            viewBox={`${0 - marginX} ${0 - marginY} ${width + marginX * 2} ${height + arrowHeight * 2 + marginY * 2}`}
        >
            <path
                d={pathD()}
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="0.5px"
                fill="white"
            />
        </svg>
    )
}
