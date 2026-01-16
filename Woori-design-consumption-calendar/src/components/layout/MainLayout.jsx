import React from 'react'
import Header from '../consumptions/Header'
import { Children } from 'react'

const MainLayout = ({children}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] bg-white shadow-lg flex flex-col min-h-screen">
        

        {/* 3. 메인 콘텐츠 영역 */}
        <main className="flex-1 p-5 overflow-y-auto">
          {children}
        </main>

        <footer className="p-4 text-center text-xs text-gray-400">
          © 2026 Woori Project
        </footer>
      </div>
    </div>
  )
}

export default MainLayout
