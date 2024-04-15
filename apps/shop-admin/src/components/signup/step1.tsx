'use client'

import useSignupStore from "@/store/signup";

function Step1() {
    const { goToNextStep } = useSignupStore();

    return (
        <div>
            <div>
                리뷰캔버스 회원가입을 환영합니다
            </div>

            <div>
                <button onClick={goToNextStep} type="button">다음 단계로 이동</button>
            </div>
        </div>
    )
}

export default Step1