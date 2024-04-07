'use client'

import { useRouter } from 'next/navigation'

function Step7() {
    const router = useRouter()

    return (
        <div>
            <div>회원가입이 완료되었습니다</div>
            <div>
                <button onClick={() => {
                    router.replace('/auth/login')
                }} type="button">로그인 페이지로 이동</button>
            </div>
        </div>
    )
}

export default Step7
