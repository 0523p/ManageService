package com.ManageService.shiro;

import com.ManageService.dao.SystemUserMapper;
import com.ManageService.entity.SystemUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

public class ShiroRealm extends AuthorizingRealm {

	@Autowired
	private SystemUserMapper systemUserMapper;

	/**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用,负责在应用程序中决定用户的访问控制的方法
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		return null;
	}

	/**
	 * 登录信息和用户验证信息验证
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		String loginName = (String)token.getPrincipal(); // 得到用户名
		SystemUser systemUser = systemUserMapper.selectByLoginName(loginName);

		if(systemUser == null) {
			throw new AuthenticationException("用户不存在");
		}
		SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
				systemUser.getLoginName(), //用户名
				systemUser.getPwd(), //密码
				ByteSource.Util.bytes(""),
				getName()
		);
		SecurityUtils.getSubject().getSession().setAttribute("session_user", systemUser);
		return authenticationInfo;
	}

}
