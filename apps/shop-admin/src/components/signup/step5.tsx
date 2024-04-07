'use client'

import useSignupStore from "@/store/signup";

function Step5() {
    const { goToNextStep } = useSignupStore();

    return (
        <div>
            <div>리뷰캔버스 설치 방식을 지정해 주세요</div>
            <div>RadioGroup</div>
            <div>
                <button onClick={goToNextStep} type="button">다음 단계로 이동</button>
            </div>
        </div>
    )
}

export default Step5
