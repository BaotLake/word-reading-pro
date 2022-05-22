import Head from "next/head"
import { styled } from "@mui/system"
import { useEffect, useState } from "react"
import { readHistory } from "../../utils/history"
import { ReadHistoryItem } from '../../components/me/ReadHistoryItem'
import Box from '@mui/material/Box'
import { Typography } from "@mui/material"
import { BlankReadHistory } from '../../components/blank/BlankReadHistory'

const Page = styled('div')({})

const Header = styled('header')({})

type HistoryData = typeof readHistory['data']

export default function () {
    const [list, setList] = useState<HistoryData[]>([])

    useEffect(() => {
        readHistory.get(3000).then((items) => {
            setList(items)
        })
    }, [])

    const removeItem = (key: number) => {
        readHistory.delete(key)
        setList(list.filter((item) => item.key !== key))
    }

    return (
        <>
            <Head>
                <title>阅读历史 - 青轻阅读 Deep Reading</title>
            </Head>
            <Page
                className="max-w-2xl m-auto"
            >
                <Header
                    className="py-3 px-5 text-2xl"
                >
                    <Typography
                        variant="h1"
                        className="text-2xl"
                        sx={{
                            fontSize: 'inherit',
                        }}
                    >阅读历史</Typography>


                </Header>
                <Box className="relative">
                    {
                        list.map((data) => (
                            <ReadHistoryItem
                                key={data.key}
                                iconUrl={data.icon}
                                title={data.title}
                                url={data.href}
                                linkHref={'/reading?url=' + encodeURIComponent(data.href)}
                                onDelete={() => removeItem(data.key)}
                            />
                        ))
                    }

                    {
                        list.length <= 0 && (
                            <BlankReadHistory />
                        )
                    }
                </Box>
            </Page>
        </>
    )
}