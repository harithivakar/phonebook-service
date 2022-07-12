import {buildProviderModule} from 'inversify-binding-decorators';
import {container} from './ioc';
import '../controller'

container.load(buildProviderModule());