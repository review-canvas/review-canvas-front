'use client'

import useSignupStore from "@/store/signup";

function Step2() {
    const { goToNextStep } = useSignupStore();

    return (
        <div>
            <div>상품 상세 페이지의 리뷰 리스트 디자인 테마 선택</div>
            <div>RadioGroup</div>
            <div>
                <button onClick={goToNextStep} type="button">다음 단계로 이동</button>
            </div>
        </div>
    )
}

export default Step2
