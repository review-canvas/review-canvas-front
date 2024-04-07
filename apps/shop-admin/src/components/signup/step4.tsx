'use client'

import useSignupStore from "@/store/signup";

function Step4() {
    const { goToNextStep } = useSignupStore();

    return (
        <div>
            <div>리뷰에 노출할 항목을 선택해 주세요</div>
            <div>CheckboxGroup</div>
            <div>
                <button onClick={goToNextStep} type="button">다음 단계로 이동</button>
            </div>
        </div>
    )
}

export default Step4
