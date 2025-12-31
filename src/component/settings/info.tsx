import { useEffect, useState } from 'react'
import { getVersion, getName } from '@tauri-apps/api/app'
import { useTranslation } from 'react-i18next'
import { openUrl } from "@tauri-apps/plugin-opener"

export default function Info() {
  const [name, setName] = useState<string | null>(null)
  const [version, setVersion] = useState<string | null>(null)
  const { t } = useTranslation()

  // 情報の取得
  useEffect(() => {
    async function getAppInfo() {
      const name = await getName()
      const version = await getVersion()
      setName(name)
      setVersion(version)
    }

    getAppInfo()
  }, [])

  // 読み込み中
  if (!name || !version) return <p className='text-xl'>Loading...</p>

  // i18nで配列として取得
  const infoList: string[] = t("settings.Info.info", { returnObjects: true }) as string[]

  return (
    <>
      <p className="text-2xl">{name} - v{version} (<button onClick={() => openUrl("https://github.com/ue0ba1ya1sh3i/widget")} className="border-b-2">GitHub</button>)</p>
      <ul className="list-disc pl-5 text-xl">
        {infoList.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </>
  )
}
