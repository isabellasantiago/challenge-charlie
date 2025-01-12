import {
    useLocation,
    useWindowSize,
    getBgColor,
    getIcon,
    notify
} from '../../../helpers';
import { ClipLoader } from 'react-spinners';
import { IconRender } from '../IconRender';
import * as S from './style';


export const Weather: React.FC = () => {
    const { weather, isLoading } = useLocation();
    const { width } = useWindowSize();
    const bgColor = getBgColor(
        weather?.current?.temp,
        weather?.daily[1]?.temp?.day,
        weather?.daily[2]?.temp?.day
    )

    const current = {
        pressure: `${weather?.current?.pressure?.toFixed(0)}hPA `|| '',
        temp: `${weather?.current?.temp.toFixed(0)} °C` || '',
        humidity: `${weather?.current?.humidity}%`,
        wind: `NO ${weather?.current?.wind_speed}km/h`,
        weather: weather?.current?.weather[0]?.description || '',
        weatherId:  weather?.current?.weather[0]?.id || '',
        timezone: weather?.timezone
    }
    const tomorrowTemp = `${weather?.daily[1]?.temp?.day?.toFixed(0)} °C` || '';
    const dayAfterTomorrowTemp =`${weather?.daily[2]?.temp?.day?.toFixed(0)} °C` || '';

    const icon = getIcon(current.weatherId, current.timezone)

    const mobile = (
        <S.Content>
            <S.WeatherContent
                isCurrent={true}
                bgColor={bgColor[1]}
            >
                <S.IconContainer>
                    <IconRender 
                        icon={icon}
                        size="200px"
                        responsiveSize="280px"
                    />
                </S.IconContainer>
                <S.InfoContainer>
                    <S.InfoDataContainer>
                        <S.Wrapper>
                            <S.InfoData
                                infoType='day'
                            >
                                hoje
                            </S.InfoData>
                            <S.InfoData
                                infoType='temperature'
                            >
                                {current?.temp}
                            </S.InfoData>
                        </S.Wrapper>
                        <S.InfoData
                            infoType='weather'
                        >
                            {current?.weather}
                        </S.InfoData>
                    </S.InfoDataContainer>
                    <S.Wrapper infoType='others'>
                            <S.InfoData infoType='others'>Vento: {current?.wind}</S.InfoData>
                            <S.InfoData infoType='others'>Humidade: {current?.humidity}</S.InfoData>
                        <S.InfoData infoType='others'>Pressão: {current?.pressure}</S.InfoData>
                    </S.Wrapper>
                </S.InfoContainer>
            </S.WeatherContent>
            <S.WeatherContent
                bgColor={bgColor[2]}
            >
                <S.InfoData>AMANHÃ {tomorrowTemp}</S.InfoData>
            </S.WeatherContent>
            <S.WeatherContent
                bgColor={bgColor[3]}            >
                <S.InfoData>DEPOIS DE AMANHÃ {dayAfterTomorrowTemp}</S.InfoData>
            </S.WeatherContent>
        </S.Content>
    )

    const others = (
        <S.Content>
        <S.WeatherContent
            isCurrent={true}
            bgColor={bgColor[1]}
        >
            <S.IconContainer>
                <IconRender 
                    icon={icon}
                    size="170px"
                    responsiveSize="280px"
                />
            </S.IconContainer>
            <S.InfoContainer>
                <S.InfoDataContainer isCurrent={true}>
                        <S.Wrapper>
                            <S.InfoData
                                infoType='day'
                            >
                                hoje
                            </S.InfoData>
                            <S.InfoData
                                infoType='temperature'
                            >
                                {current?.temp}
                            </S.InfoData>
                        </S.Wrapper>
                        <S.InfoData
                            infoType='weather'
                        >
                            {current?.weather}
                        </S.InfoData>
                    <S.Wrapper>
                        <S.InfoData infoType='others'>Vento: {current?.wind}</S.InfoData>
                        <S.InfoData infoType='others'>Humidade: {current?.humidity}</S.InfoData>
                        <S.InfoData infoType='others'>Pressão: {current?.pressure}</S.InfoData>
                    </S.Wrapper>
                </S.InfoDataContainer>
            </S.InfoContainer>
        </S.WeatherContent>
        <S.WeatherContent
            bgColor={bgColor[2]}
        >
            <S.InfoContainer>
                <S.InfoDataContainer>
                    <S.InfoData>AMANHÃ </S.InfoData>
                    <S.InfoData>{tomorrowTemp}</S.InfoData>
                </S.InfoDataContainer>
            </S.InfoContainer>
        </S.WeatherContent>
        <S.WeatherContent
            bgColor={bgColor[3]}
        >
            <S.InfoContainer>
                <S.InfoDataContainer>
                <S.InfoData>DEPOIS DE AMANHÃ</S.InfoData>
                <S.InfoData>{dayAfterTomorrowTemp}</S.InfoData>
                </S.InfoDataContainer>
            </S.InfoContainer>
        </S.WeatherContent>            
        </S.Content>
    )

    if(isLoading) return (
        <S.CenterSpinner>
            <ClipLoader 
                color='#FFF'
                loading={isLoading}
            />
        </S.CenterSpinner>
    )

    return (
        width > 470 && !isLoading ? others : mobile
    )
}