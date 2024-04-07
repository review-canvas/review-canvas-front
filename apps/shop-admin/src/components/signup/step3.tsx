'use client'

import useSignupStore from "@/store/signup";

function Step3() {
    const { goToNextStep } = useSignupStore();

    return (
        <div>
            <div>리뷰 상세 모달 디자인 테마 선택</div>
            <div>RadioGroup</div>
            <div>
                <button onClick={goToNextStep} type="button">다음 단계로 이동</button>
            </div>
        </div>
    )
}

export default Step3
